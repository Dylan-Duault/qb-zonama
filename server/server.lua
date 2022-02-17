local QBCore = exports['qb-core']:GetCoreObject()

-- create Zonama:Server:getItem
QBCore.Functions.CreateCallback('zonama:server:get-items', function(source, cb)
    local src = source
    local player = QBCore.Functions.GetPlayer(src)
    if player then
        -- get all items and join category
        local items = MySQL.Sync.fetchAll(
            "SELECT items.id AS 'id', items.name AS 'name', items.price AS 'price', items.image AS 'image', items.description AS 'description', category.name AS 'category_name' FROM za_items items INNER JOIN za_categories category ON category.id = items.category_id;")
        cb(items)
    end
end)

-- create zonama:server:create-order
QBCore.Functions.CreateCallback('zonama:server:create-order', function(source, cb, cart)
    local src = source
    local xPlayer = QBCore.Functions.GetPlayer(src)

    local citizenid = xPlayer.PlayerData.citizenid

    local currentBank = xPlayer.Functions.GetMoney('bank')

    if tonumber(cart.price) <= currentBank then
        local bank = xPlayer.Functions.RemoveMoney('bank', tonumber(cart.price))

        local result = MySQL.Async.insert(
            'INSERT INTO `za_orders` (`citizen_id`, `price`) VALUES (@citizen_id, @price)', {
                ['@citizen_id'] = citizenid,
                ['@price'] = cart.price
            }, function(orderId)

                local query = 'INSERT INTO `za_order_item` (`order_id`, `item_id`, `quantity`) VALUES '

                for k, item in pairs(cart.items) do
                    query = query .. '(' .. orderId .. ', ' .. item.id .. ', ' .. item.quantity .. '),'
                end

                -- replace last comma with semicolon
                query = string.sub(query, 1, -2) .. ';'

                MySQL.Async.execute(query, {}, function(rows)
                    -- send success notification to player
                    TriggerClientEvent('QBCore:Notify', src, Lang:t('success.cart_paid', {
                        amount = cart.price
                    }), 'success')
                    TriggerClientEvent('zonama:client:close-nui', src)
                    cb(true)
                end)
            end)
    else
        TriggerClientEvent('QBCore:Notify', src, Lang:t("error.not_enough_money"), 'error')
        cb(false)
    end
end)

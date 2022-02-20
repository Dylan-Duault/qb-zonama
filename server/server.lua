local QBCore = exports['qb-core']:GetCoreObject()

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

-- Get all orders
QBCore.Functions.CreateCallback('zonama:server:get-orders', function(source, cb)
    local orders = MySQL.Sync.fetchAll('SELECT * FROM `za_orders`', {})
    print(orders)
    cb(orders)
end)

-- Get all orders from player
QBCore.Functions.CreateCallback('zonama:server:get-orders-from-player', function(source, cb, xPlayer)

    local citizenid = xPlayer.PlayerData.citizenid

    local orders = MySQL.Sync.fetchAll('SELECT * FROM `za_orders` WHERE `citizen_id` = @citizen_id', {
        ['@citizen_id'] = citizenid
    })
    print(orders)
    cb(orders)
end)

-- Get items from order
QBCore.Functions.CreateCallback('zonama:server:get-order-items', function(source, cb, orderId)
    local items = MySQL.Sync.fetchAll('SELECT * FROM `za_order_item` WHERE `order_id` = @order_id', {
        ['@order_id'] = orderId
    })
    print(items)
    cb(items)
end)

QBCore.Commands.Add('zonama-get-random-order', Lang:t("commands.get_random_order"), {}, false, function(source, args)

    -- get one random order
    local result = MySQL.Sync.fetchAll('SELECT * FROM `za_orders` ORDER BY RAND() LIMIT 1', {})
    if (result) then
        local randomOrder = result[1]

        -- get items from order and join item name, quantity, citizen_id
        local query = [[
            SELECT items.name AS `name`, za_order_item.quantity AS `quantity`, _order.citizen_id AS `citizen_id` FROM za_order_item
            INNER JOIN za_items items ON items.id = za_order_item.item_id
            INNER JOIN za_orders _order ON _order.id = @order_id
            WHERE za_order_item.order_id = @order_id;
        ]]

        local items = MySQL.Sync.fetchAll(query, {
            ['@order_id'] = randomOrder.id
        })

        print(json.encode(items))

    end
end)

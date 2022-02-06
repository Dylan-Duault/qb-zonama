local QBCore = exports['qb-core']:GetCoreObject()

-- create Zonama:Server:getItem
QBCore.Functions.CreateCallback('zonama:server:getItems', function(source, cb)
    local src = source
    local player = QBCore.Functions.GetPlayer(src)
    if player then
        -- get all items and join category
        local items = MySQL.Sync.fetchAll(
            "SELECT items.name AS 'item_name', items.price AS 'item_price', items.image AS 'item_image', items.description AS 'item_description', category.name AS 'category_name' FROM za_items items INNER JOIN za_categories category ON category.id = items.category_id;")
        cb(items)
    end
end)

local QBCore = exports['qb-core']:GetCoreObject()

local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('show-nui', function()
    toggleNuiFrame(true)
    debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
end)

-- Contact server to get a list of za_items from the database
RegisterNetEvent('zonama:client:getItems', function()
    -- Contact server with callback

    QBCore.Functions.TriggerCallback('zonama:server:getItems', function(items)
        Citizen.Trace(json.encode(items))
    end)
end)

-- Register command to call getItems
RegisterCommand('zonama-get-items', function()
    TriggerEvent('zonama:client:getItems')
end)

RegisterNUICallback('getItems', function(data, cb)
    local data = nil
    QBCore.Functions.TriggerCallback('zonama:server:getItems', function(items)
        cb(items)
    end)
end)

exports['qb-target']:AddTargetModel(QBZonama.Monitors, {
    options = {{
        type = "client",
        event = "zonama:client:open-nui",
        icon = "fa-brands fa-amazon",
        label = "Open Zonama",
        price = 5
    }},
    distance = 2.5
})

RegisterNetEvent('zonama:client:open-nui', function(data)
    toggleNuiFrame(true)
end)

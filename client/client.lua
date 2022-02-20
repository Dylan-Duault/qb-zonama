local QBCore = exports['qb-core']:GetCoreObject()

local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
end)

RegisterNUICallback('zonama:client:get-items', function(_, cb)
    -- Contact server with callback
    QBCore.Functions.TriggerCallback('zonama:server:get-items', function(items)
        cb(items)
    end)
end)

RegisterNUICallback('zonama:client:create-order', function(data, cb)
    QBCore.Functions.TriggerCallback('zonama:server:create-order', function(response)
        cb(response)
    end, data)
end)

exports['qb-target']:AddTargetModel(QBZonama.Monitors, {
    options = {{
        type = "client",
        event = "zonama:client:open-nui",
        icon = "fa-brands fa-amazon",
        label = "Open Zonama",
        price = 5,
        canInteract = function(entity)
            return GetEntityHealth(entity) == GetEntityMaxHealth(entity)
        end
    }},
    distance = 2.5
})

RegisterNetEvent('zonama:client:open-nui', function(data)
    toggleNuiFrame(true)
end)

RegisterNetEvent('zonama:client:close-nui', function(data)
    toggleNuiFrame(false)
end)

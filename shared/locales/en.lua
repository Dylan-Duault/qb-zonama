local Translations = {
    error = {
        not_enough_money = "You don't have enough money in the bank."
    },
    success = {
        cart_paid = 'You have paid $%{amount}'
    }
}

Lang = Locale:new({
    phrases = Translations,
    warnOnMissing = true
})

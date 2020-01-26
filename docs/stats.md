We need to track stats somehow

### Balance trend
We should capture the account balance updates

capture stats on any event that might modify account balance such as:

- addNewRecord
- addNewAccount
- updateAccount

addNewRecord -> updateAccountBalance -> captureStats


We need to figure how to know when account was updated.
`createdAt` won't work, since it's referring to account creation date
`updatedAt` also might not work, especially when hydrating store. 
ideally we should pass record creation date into account balance update action

account balance update dates:

- when triggered by record add/update - it should be the record creation date
- when triggered by account add/update - it should be account.updatedAt date



TODO: review records updates/deletes


### to calculate balance trend

For every account:

- getAccountDirectives
- fillInMissingDirectives
- transformAccountDirectives

the above will give as a whole list of account snapshots

then: 

- consolidate all account snapshots
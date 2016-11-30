# qwerty

## Seeding the Database with this command:
```
mongoimport --db qwertydb --collection users --type json --file start_users.json --jsonArray
```

## If you want to empty the database, run this command
```
mongo qwertydb --eval "db.dropDatabase()"
```
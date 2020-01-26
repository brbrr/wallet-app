# Categories

## Basic concepts

There are 2 ways to access the categories screens:

1. Through "New Record" flow
1. Via Settings -> Categories

### "New Record" flow

- User should be able to select specific category as well as parent category
- User should be able to enable "Edit" mode within this flow

### "Settings" flow

- User should be able to edit both parent and sub-categories
- User should be able to add new category

### "Edit" mode

- Allows to edit both parent and subcategories
- Allows to add/remove categories
- Its possible to remove categories without assigned records
- [Maybe] Create mechanizm to re-assign category on deletion

### TODO

1. Create "New Record" > Categories > Sub Categories > Select flow
1. Add "Edit" header buttons for both Cat/SubCat screens
1. Create "Settings > Edit Cat / Sub Cat" flow
  - Renders list of parent Cats, which leads to Edit Cat/List subCats screen  
  - SubCat screen should have 2 modes: select & edit. in "Edit" it should display Edit component for parent Cat as well as list of SubCats which should lead to Edit component for that particular SubCat

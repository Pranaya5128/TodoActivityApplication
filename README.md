# TodoActivityApplication
This is a Todo activity tracker.

The UI is build in React with Typescript using react table for grid implementation (other alternatvies could be using some external grid library like ag grid).

The backend is web .netcore web API solution with SQL lite as it database and using migration scripts to create the table structure.

The main features are:-
1) The user can enter new todo Activities which need to be more than 10 characters long. Other wise there is a error message.
2) The user has an option to add the deadline date for the user but it is not mandatory. But if the user doesn't choose the date from the picker the deadline would be set to the current date by default.
3) The UI also has a grid which shows all the acitvites added with there deadlines. If the deadline is in the past then the whole row is showed in red.
4) There are action buttons to mark the task complete (edit) or delete it on each record.
5) There is pagination in the grid which is shown if the grid has over 5 records.
6) The edit button gets disabled once the activity is marked as completed.

 Points to highlight:-
1) Currently in the API solution I have not added a separate data layer and business layer project but in the proper application all those would be separate projects so that there would be separation of concerns.
2) Test case project or unit test cases have not been writen for these 2 applications.

Things which can be added futher:-
1) Filteration and global search can be added to the grid.
2) Currently the edit but only marks the record to completed but we can extend the functionality to include inline edit which allows the user to edit the description of the activity and also edit the status to either Active again in case something was missed earlier.
3) We can include adding confirmation popup on click of the delete button which gives the user an option to abort the delete operation in case he/she changes there mind of deleting.
4) Currently the todo activity list in saved generically. But we can include authentication and autherization and also include user management to the projects. Then we could show user specific todo activity list to the users.
5) Further many further improvements can be done which we could discuss at a later point. 

For any other further queries please feel free to get in touch with me at pranaya9293@gmail.com

defmodule RallyWeb.UserController do
   use RallyWeb, :controller 
   alias Rally.User
   alias Rally.Repo

   def index(conn, _params) do
      users = Repo.all(User) 
      render conn, "index.json", users: users
   end
   
end
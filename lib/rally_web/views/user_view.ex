defmodule RallyWeb.UserView do
   use RallyWeb, :view

   def render("index.json", %{users: users}) do
      %{data: render_many(users, RallyWeb.UserView, "user.json")}
   end

   def render("user.json", %{user: user}) do
      %{username: user.username}
   end
end
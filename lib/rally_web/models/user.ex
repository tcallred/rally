defmodule Rally.User do
   use RallyWeb, :model 

   schema "users" do
      field :username, :string
      field :password, :string, virtual: true
      field :password_hash, :string

      timestamps()
   end

   def changeset(model, params \\ :empty) do
     model
     |> cast(params, ~w(username), []) 
     |> validate_length(:username, min: 1, max: 20)
   end
end
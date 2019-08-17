defmodule Rally.Repo do
  use Ecto.Repo,
    otp_app: :rally,
    adapter: Ecto.Adapters.Postgres
end

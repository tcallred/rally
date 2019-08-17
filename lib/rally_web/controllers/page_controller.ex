defmodule RallyWeb.PageController do
  use RallyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

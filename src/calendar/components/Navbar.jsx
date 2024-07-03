import { useAuthStore } from "../../hooks"

export const Navbar = () => {

  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fa fa-calendar-alt" ></i>
        &nbsp;
        { user.name }
      </span>
      <button className="btn btn-outline-danger" onClick={ startLogout }>
        <span>Salir</span>
        &nbsp;
        <i className="fa fa-sign-out-alt" ></i>
      </button>
    </div>
  )
}

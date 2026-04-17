import "./Auth.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Smart Campus Assistant</h1>
          <p>One platform for announcements, complaints & campus services</p>
        </div>

        <div className="auth-right">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
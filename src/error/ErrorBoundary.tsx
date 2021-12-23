import React from "react";

class ErrorBoundary extends React.Component {
    state = { hasError: false, message: "" };
    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }
    componentDidCatch(error: any) {
        this.setState({message: error.message})
        
    }
  
    
    render() {
        if (this.state.hasError) {
            return (
            <div style={{width: "500px", margin:"auto"}}>
                <h1>{this.state.message}</h1>
                {/* <a href="/">Back</a> */}
                {/* <button  onClick={() => {
              window.location.reload();}}>
                Try again?
                </button> */}
                
            </div>
            );
        }
        return this.props.children;
    }  
}

export default ErrorBoundary
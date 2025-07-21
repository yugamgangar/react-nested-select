import React from 'react';

class DropdownErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorInfo: null
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorInfo: error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Dropdown error caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "1rem", color: "red", border: "1px solid red" }}>
                    <strong>Something went wrong in the dropdown.</strong>
                    <p>{this.state.errorInfo?.toString()}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default DropdownErrorBoundary;

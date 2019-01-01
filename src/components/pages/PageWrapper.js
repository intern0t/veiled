import React, { Component } from "react";
import { AppConsumer } from "../../contexts/AppProvider";

class PageWrapper extends Component {
    componentDidMount() {
        const { match } = this.props;
        const { currentPage, onPageChange } = this.context;
        console.log(currentPage);
        
        if(match.path !== currentPage){
            onPageChange(match.path || match.url || "/conversation");
        }
    }

    render() {
        const { children } = this.props;
        return <div className="frightbar">{children}</div>;
    }
}

PageWrapper.contextType = AppConsumer;
export default PageWrapper;

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img src={this.props.imageUrl} height="300px" onClick={() => this.props.deleteCard(this.props.id) }/>
        );
    }
}
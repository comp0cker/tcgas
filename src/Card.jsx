class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardUrl: ""
        }
    }

    componentDidMount() {
        fetch(getCardUrl(this.props.name, this.props.set, this.props.number))
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({ cardUrl: result.cards[0].imageUrl })
            }
        )
    }

    render() {
        return (
            <img src={this.state.cardUrl} height="300px" />
        );
    }
}
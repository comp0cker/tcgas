class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img src={this.props.imageUrl} height={CARD_HEIGHT} onClick={() => this.props.onCardClick() }/>
        );
    }
}
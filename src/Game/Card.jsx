class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.cardBack || (!this.props.view && (this.props.class === "deck" || this.props.class === "prize"))) {
            return (
                <img 
                src={CARD_BACK_URL} 
                className={this.props.class}
                width={CARD_WIDTH} 
                onClick={() => this.props.onCardClick() }/>
            );
        }
        return (
            <img 
                src={this.props.imageUrl} 
                className={this.props.class + "ui-state-default"}
                width={CARD_WIDTH} 
                onClick={() => this.props.onCardClick() }/>
        );
    }
}
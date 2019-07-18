class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img 
                src={this.props.imageUrl} 
                className={this.props.class}
                height={CARD_HEIGHT} 
                onDoubleClick={() => this.props.onCardClick() }/>
        );
    }
}
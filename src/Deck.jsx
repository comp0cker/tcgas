class Deck extends React.Component {
    constructor(props) {
        super(props);
    }

    passResult(url) {
        console.log(url)
    }

    render() {
        return (
            <div>
                {this.props.cards.map(obj => 
                    <Card 
                        name={obj.name} 
                        set={obj.set}
                        number={obj.number}
                        id={obj.id}
                        imageUrl={obj.imageUrl}

                        deleteCard={this.props.deleteCard}
                />)}
            </div>
        );
    }
};
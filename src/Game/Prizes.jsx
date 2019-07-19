class Prizes extends React.Component {
    constructor(props) {
        super(props);
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
                        supertype={obj.supertype}
                        class="prize"

                        onPrizeCardClick={() => this.props.onPrizeCardClick(obj.id)}
                />)}
            </div>
        );
    }
}
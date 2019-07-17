class Deck extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.cards);
        return (
            <div>
                {this.props.cards.map(obj => 
                    <Card 
                        name={obj.name} 
                        set={obj.set}
                        number={obj.number}
                />)}
            </div>
        );
    }
};
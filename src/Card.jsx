class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            cardUrl: ""
        }
    }

    componentDidMount() {
        $("img").draggable ();
        $("img").draggable ('enable');

        fetch(this.getCardUrl("Tapu Lele"))
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({ cardUrl: result.cards[0].imageUrl })
            }
        )
    }

    getCardUrl(input)
    {
        input = input.split(" GX").join("-GX");
        input = input.split(" EX").join("-EX");

        var count = get_count(input); // yeah rip the count variable (we might wanna do some cool stack effect tho)
        input = crop_count(input);
        var url = parse_input(input);
        return url;
    }

    render() {
        return (
            <img src={this.state.cardUrl} height="300px" />
        );
    }
}
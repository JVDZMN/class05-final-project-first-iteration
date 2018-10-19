import React, {Component} from "react"
import dateFns from "date-fns"
import '../../App.css'

const url = 'https://raw.githubusercontent.com/paredesrichard/commandline/master/events.json'

class Calendar extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            events:[]
        }
    }
    
    componentDidMount(){
        this.renderEvents()
        console.log("did mount ", this.state.events)
    }
    
    renderEvents = () => {
        fetch(url).then(response => {
            const events = response.json()
            console.log(events)

            events.map(event => {
                console.log("event :" + event.event_start_date , event.event_name)
                let eve = {
                    name: event.event_name,
                    date: event.event_start_date
                }
                console.log("eve name : ", eve.name, " eve date: ", eve.date)
                let eves = this.state.events
                console.log("eve before push ", eves)
                eves.push(eve)
                console.log("eves : ", eves)
                this.setState({
                    events: eves
                })
            })
            
        }).catch((Error) => console.log('Error ', Error))
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY"

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
                <button onClick={this.seeEvents}>click me!</button>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd"
        const days = []

        let startDate = dateFns.startOfWeek(this.state.currentMonth)

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            )
        }

        return <div className="days row">{days}</div>
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state
        const monthStart = dateFns.startOfMonth(currentMonth)
        const monthEnd = dateFns.endOfMonth(monthStart)
        const startDate = dateFns.startOfWeek(monthStart)
        const endDate = dateFns.endOfWeek(monthEnd)

        const dateFormat = "D"
        const rows = []

        const days = []
        let day = startDate
        let formattedDate = ""

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat)
                days.push(
                    <div
                        className={`col cell ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : 
                        dateFns.isSameDay(day, selectedDate) ? "selected" : ""}`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(day))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                        <span className="event-one">{this.findEvents(formattedDate)}</span>
                    </div>
                )
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            )
        }
        return <div className="body">{rows}</div>
    }

    onDateClick = day => this.setState({selectedDate: day})

    nextMonth = () => this.setState({currentMonth: dateFns.addMonths(this.state.currentMonth, 1)})

    prevMonth = () => this.setState({currentMonth: dateFns.subMonths(this.state.currentMonth, 1)})


    seeEvents = () => console.log("see events" + this.state.events)

    findEvents = (day) => {
        let eventThisMonth = this.state.events.filter(event =>{
            dateFns.getMonth(event.date === this.state.currentMonth)
        })
        console.log("event this month ", eventThisMonth)
        eventThisMonth.map(event =>{
            if (dateFns.format(event.date, 'D')=== day)
            return event.name;
        })
        
    }

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        )
    }
}

export default Calendar







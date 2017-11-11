import React, { Component } from 'react';
import { Glyphicon, Col, Row } from 'react-bootstrap';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import '../style/App.css';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import { Events } from '../utils/events'


BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(Moment)
);

export default class Planner extends Component {
    constructor(props, context)
    {
        super(props, context);
        this.context = context;
        console.log("Events = " + Events)
        this.state = {events: Events};
    }

    handleSelectSlot({start, end})
    {
        //create an event with title "Test"
        console.log("handleSelectSlot: " + start + " - " + end);
        this.state.events.push({start: start, end: end, title: "Test"});
        this.setState({});

    }

    handleSelectEvent()
    {
        //just for example
        console.log("handleSelectEvent: " + JSON.stringify(arguments));
    }

    EventWeek(props)
    {
        return <strong>{props.event.title}</strong>
    }

    EventAgenda(props)
    {
        return <em>{props.event.title}</em>
    }

    render()
    {
        return (
            <div className='Calendar'>
                <BigCalendar
                    selectable
                    popup
                    events={this.state.events}
                    onSelectSlot={this.handleSelectSlot.bind(this)}
                    onSelectEvent={this.handleSelectEvent.bind(this)}
                    views={['month', 'week', 'day']}
                    defaultDate={new Date(2017, 11, 1)}
                    eventPropGetter={e => ({ className: 'test-class'})} /* Here you can define a style for the element */
                    components={{
                        event: this.EventWeek,
                        agenda: {
                            event: this.EventAgenda
                        }
                    }}
                />
        </div>);
    }
}

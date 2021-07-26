import { Line } from 'react-chartjs-2';
import classes from "./PanelMainPAge.module.scss"
import { Grid } from '@material-ui/core';
import { PanelHeader } from '../../../layouts/index'
import {useState, useEffect} from "react"
import OrderApi from "../../../api/orders.api"
import {getFirstDayOfWeek, getBeginningOfDayByMiliSeconds, getEndingOfDayByMiliSeconds} from "../../../utils/date.utils"

const data = {
    labels: [],
    datasets: [],
};

const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
};

export const PanelMainPage = ()=>{
    const [state , setState] = useState({ chart:data })

    const setOrdersState = async (days)=>{
        const saleResponses = await Promise.all(days.map(day => OrderApi.gets({ params: {createdAt_gte: getBeginningOfDayByMiliSeconds(day), createdAt_lte: getEndingOfDayByMiliSeconds(day)}})))
        setState({ chart:{
            ...state ,
            labels:days.map(day => new Date(day).toLocaleDateString('fa-IR')),
            datasets:[
                {
                    label: 'مجموع فروش روزانه در این هفته',
                    data: saleResponses.map(res => res.data.length > 0 ? res.data.reduce((acc, cv)=>acc + cv.cost, 0) : 0),
                    fill: false,
                    backgroundColor: 'rgb(52,63,86)',
                    borderColor: 'rgb(52,63,86, 0.2)',
                },
            ]
        }})
    }

    useEffect(()=>{
        const days = []
        let startOfWeek = getFirstDayOfWeek().getTime()
        days.push(startOfWeek)
        for(let i=1;i<=6; i++){
            startOfWeek+=86400 * 1000
            days.push(startOfWeek)
        }
        setState({ chart:{
            ...state,
            labels:days.map(day => new Date(day).toLocaleDateString('fa-IR'))
        }})
        setOrdersState(days)
    }, [])

    return (
        <>
            <PanelHeader/>
            <div className={classes.lineChartContainer}>
                <Grid xl={8} md={8} sm={8} container={true}>
                    <Line data={state.chart} options={options} />
                </Grid>
            </div>
        </>
    )
}
import moment from 'jalali-moment'

export const formatFa =(date)=>{ //createdAt
    return moment(date).local("fa").format("D MMM YYYY");
}

export const DATE = ()=>{
    let date = new Date();
    let fullYear = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let fullDate = `${fullYear}-${month}-${day}`;
    return moment(fullDate, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
}

export const TIME = ()=>{
    let date = new Date().toLocaleString("en-US", {timeZone: "Asia/Tehran"});
    date = new Date(date);
    let hours = date.getHours();
    let min = date.getMinutes()+1;
    let sec = date.getSeconds();
    let fulltime = `${hours}:${min}:${sec}`;
    return fulltime;
}
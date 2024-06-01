import dotenv from "dotenv";
import { SendConfirmationMail} from "../Services/SendMail.js";
import Data from "../Models/DataSchema.js"



dotenv.config();

export const getAllBookings = async (req, res) => {
  try {
    let {theaterName, date, movieName, time, email} = req.query;
    // console.log(theaterName, date, movieName, time)
    let BookingsListObject = await Data.findOne({_id:"66433637ec5fb1ae7b7f3403"})
    let BookingsList = BookingsListObject.data[0]
    if(BookingsList[theaterName]){
        if(BookingsList[theaterName][date]){
            if(BookingsList[theaterName][date][movieName]){
                if(BookingsList[theaterName][date][movieName][time]){
                    return res.status(200).send({data:{...BookingsList[theaterName][date][movieName][time].bookedSeat}});
                }else{
                    return res.status(200).send({data:"No Bookings","Datas":BookingsList});
                }
            }else{
                return res.status(200).send({data:"No Bookings","Datas":BookingsList});
            }
        }else{
            return res.status(200).send({data:"No Bookings","Datas":BookingsList});
        }
    }else{
        return res.status(200).send({data:"No Bookings","Datas":BookingsList});
    }

    //return res.status(200).send({data:BookingsList.data[0]})
    
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Upload Failed" });
  }
};

export const updateBooking = async (req, res) => {
    try{
        const { email, theaterName, date, movieName, time, seatNumbers } = req.body;
        let bookingData = await Data.findOne({_id:"66433637ec5fb1ae7b7f3403"})
        // console.log(bookingData);
        let prevData = {...bookingData.data[0]};

        let seat={};
        seatNumbers.map((seatItem)=>{
            seat={...seat,[seatItem]:{"bookedStatus":"BOOKED","bookedBy":email}}
        })
            
        for (let key in seat) {
            if (!prevData[theaterName]) {
                prevData[theaterName] = {};
            }
            if (!prevData[theaterName][date]) {
                prevData[theaterName][date] = {};
            }
            if (!prevData[theaterName][date][movieName]) {
                prevData[theaterName][date][movieName] = {};
            }
            if (!prevData[theaterName][date][movieName][time]) {
                prevData[theaterName][date][movieName][time] = { bookedSeat: {} };
            }
            
            // console.log("key...", prevData[theaterName][date][movieName][time]);
        
            if (prevData[theaterName][date][movieName][time].bookedSeat[key]) {
                return res.status(400).send({ message: `Seat no ${key} is already booked` });
            }
        
            prevData[theaterName][date][movieName][time].bookedSeat[key] = seat[key];
        }
        

        bookingData.data[0] ={...prevData}
        // console.log(prevData[theaterName][date][movieName])
        await bookingData.save()
        const message = `
            <p>Dear User,</p>
            <p>You have requested to Book for a Movie in our Ticket Booking Website And the Booking is Confirmed</p>
            <p>Movie Name: ${movieName}</p>
            <p>Theater Name: ${theaterName}</p>
            <p>Seat Number: ${seatNumbers.map((seat)=> seat+", ")}</p>   
            <p>Date and Time: ${date} ${time} </p>`;
            SendConfirmationMail(email, message);
        
        return res.status(200).send({ message: "Booked Successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
}
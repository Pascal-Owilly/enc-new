import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Calendar } from "lucide-react"
import { Clock } from "lucide-react"
import { Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function BookingPage() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(1)
  const [confirmationMessage, setConfirmationMessage] = useState('')

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
  }

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuests(Number(e.target.value))
  }

  const handleConfirmBooking = () => {
    setConfirmationMessage(`Booking confirmed for ${date} at ${time} for ${guests} guests.`)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Book a Reservation</CardTitle>
        <CardDescription>Select your preferred date, time, and number of guests.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
            Date
          </Label>
          <div className="mt-2 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="time" className="block text-sm font-medium leading-6 text-gray-900">
            Time
          </Label>
          <div className="mt-2 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={handleTimeChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="guests" className="block text-sm font-medium leading-6 text-gray-900">
            Guests
          </Label>
          <div className="mt-2 relative rounded-md shadow-sm flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              type="number"
              id="guests"
              value={guests}
              onChange={handleGuestsChange}
              min={1}
              className="pl-10"
              required
            />
          </div>
        </div>
        <Button onClick={handleConfirmBooking} className="w-full">
          Confirm Booking
        </Button>
        {confirmationMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            {confirmationMessage}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
Share
Refresh


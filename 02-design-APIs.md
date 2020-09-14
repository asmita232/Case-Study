## API Design

GET/POST/PATCH/PUT/DELETE /endpoint
    - Query params (?param1=value&... if any)
    - Path params ( /path/:something/... etc.)
    - Request body - What data is to be sent and what form (shape of JSON with fields)
    - HTTP headers

- Calendar
    - GET /calendar 
        - Query params: ?date=2020-09-14 (default to current date), id: userId
        - Path params: -
        - Temporary query param: user id / email. We set the urlencoded form of ?date=2020-09-14&email=jane.doe@example.com
        - Request body:
        - eg get localhost:3000/calendar?date=2020-09-14&id=1234

- Search for meeting
    - GET /meetings
        - Query params:
            - date: ALL / PRESENT / PAST / FUTURE
            - search_terms
            - id
            - eg get localhost:3000/meetings?date=PAST&search_teram=node&id=230
        - Temporary query param: user id / email. We set the urlencoded form of ?email=jane.doe@example.com
        - Path params: - 
        - Request body: -
    - [DB Query]:
        - Construct date object from string
        - Construct dateFilter based on PAST / PRESENT / etc.
        - find( { attendees: "jane@example.com",  date: dateFilter, description: { $regex: ... } } ).sort( 'fields' )
        - find( { "attendees.userId": "jane@example.com",  date: dateFilter, description: { $regex: ... } } ).sort( 'fields' )
    - Response: An array of JSON objects - Meetings that match the criteria

- Getting list of users
    - GET /users
    - Query params - 
    - Path params - 
    - Headers Application/

- Adding a new user as attendee for a meeting
    - PATCH /meetings/:meetingid?action=add_attendee
    - Query params - action= add_attendee, id=userEmailId
    - Path params - meetingid
    - eg localhost:3000/meetings/:meetingid?action=add_attendee&id=userEmailId

- Excusing yourself from the meeting
    - PATCH /meetings/:meetingid?action=remove_yourself
    - Temporary query param: email. We set the urlencoded form of ?email=jane.doe@example.com

- Adding meeting
    - POST /meetings
    - Temporary query param: user id / email. We set the urlencoded form of ?email=jane.doe@example.com
    - Request Body - {
        name, short-name, attendees, date, start-date, end-date
    }


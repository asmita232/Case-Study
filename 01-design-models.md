# Models

- User
    - _id
    - name
    - email
    - password
    // - meetings: [ meeting._id / meeting.name, ... ]

- Meeting
    - _id
    - name
    - description
    - date
    - startTime
    - endTime
    - attendees: [ emails_of_attendees ] - Option 1
    or
    - attendees: [ { userId: user._id, email: user.emailids_of_attendee }, ... ] - Option 2

For Calendar API : Jane's meeting on 14th September...
    - Given: Jane's email and date (Option 1)
    - Given: Jane's _id / email and date (Option 2)

For Adding a meeting : 
    - Given: Meeting details and emails (comma-separated) - Create a meeting with the emails set to attendees field - Option 1
    - Option 3: Adding a dropdown with users (change in UI)
    - Given: Another option we have is to display all emails in a dropdown in the add meetings screen - and have the user select them and add to a list of emails.
    - Option 2: Query for all users who have their email id $in the comma-separated list of emails
        const matchedUsers = User.find( { email: { $in: [ 'jane@example.com', 'john@example.com' ] } })



export default {
  user: {
    type: 'reviewer',
  },
  requests: [
    {
      id: 1,
      consortium: 'INSTRuCT',
      state: 'under review',
      submitted_at: '2021-02-09 17:13:29',
      completed_at: '',
      attributes: [
        {
          id: 0,
          name: 'Attribute X',
          type: 'text',
          value: 'foo',
          optional: false,
        },
        {
          id: 1,
          name: 'Attribute Y',
          type: 'text',
          value: 'bar',
          optional: false,
        },
      ],
      available_user_actions: ['REQUEST_UPDATE', 'ACCEPT', 'REJECT'],
      project: {
        id: 1,
        title: 'Research project 1',
        description: "Jane's another awesome research project.",
      },
      researcher: {
        first_name: 'Jane',
        last_name: 'Doe',
        institution: 'University of Chicago',
      },
    },
    {
      id: 2,
      consortium: 'INSTRuCT',
      state: 'under review',
      submitted_at: '2021-02-19 17:13:29',
      completed_at: '',
      attributes: [
        {
          id: 0,
          name: 'Attribute X',
          type: 'text',
          value: 'foo',
          optional: false,
        },
        {
          id: 1,
          name: 'Attribute Y',
          type: 'text',
          value: 'bar',
          optional: false,
        },
      ],
      available_user_actions: ['REQUEST_UPDATE', 'ACCEPT', 'REJECT'],
      project: {
        id: 3,
        title: 'Research project 3',
        description: "Richard's awesome research project.",
      },
      researcher: {
        first_name: 'Richard',
        last_name: 'Roe',
        institution: 'University of Chicago',
      },
    },
  ],
};

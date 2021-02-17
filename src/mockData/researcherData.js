export default {
  user: {
    type: 'researcher',
  },
  projects: [
    {
      id: 0,
      name: 'Research project 0',
      description: "Jane's first awesome research project.",
      researcher: {
        id: 0,
        first_name: 'Jane',
        last_name: 'Doe',
        institution: 'University of Chicago',
      },
      requests: [
        {
          id: 0,
          consortium: 'INSTRuCT',
          state: 'not submitted',
          submitted_at: '',
          completed_at: '',
          attributes: [
            {
              id: 0,
              name: 'Attribute X',
              type: 'text',
              value: '',
              optional: false,
            },
            {
              id: 1,
              name: 'Attribute Y',
              type: 'text',
              value: '',
              optional: false,
            },
          ],
          available_user_actions: ['SUBMIT'],
        },
      ],
      searches: [
        {
          name: 'Cohort A',
          description: 'INSTRuCT & COG',
          filters:
            '{"consortium":{"selectedValues":["INSTRuCT"]},"data_contributor_id":{"selectedValues":["COG"]}}',
        },
      ],
    },
    {
      id: 1,
      name: 'Research project 1',
      description: "Jane's another awesome research project.",
      researcher: {
        id: 0,
        first_name: 'Jane',
        last_name: 'Doe',
        institution: 'University of Chicago',
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
          available_user_actions: [''],
        },
      ],
      searches: [
        {
          name: 'Cohort A',
          description: 'INSTRuCT & COG',
          filters:
            '{"consortium":{"selectedValues":["INSTRuCT"]},"data_contributor_id":{"selectedValues":["COG"]}}',
        },
        {
          name: 'Cohort B',
          description: 'INSTRuCT & CWS',
          filters:
            '{"consortium":{"selectedValues":["INSTRuCT"]},"data_contributor_id":{"selectedValues":["CWS"]}}',
        },
      ],
    },
  ],
};

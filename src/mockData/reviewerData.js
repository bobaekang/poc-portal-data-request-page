import { REQUEST_STATE, USER_ACTION_TYPE } from './const';

export default {
  user: {
    type: 'reviewer',
  },
  requests: [
    {
      id: 1,
      consortium: 'INSTRuCT',
      state: REQUEST_STATE.UNDER_REVIEW,
      submitted_at: '2021-02-09 17:13:29',
      completed_at: '',
      attributes /** @type {Attribute[]} */: [
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
      available_user_actions: [
        USER_ACTION_TYPE.REQUEST_UPDATE,
        USER_ACTION_TYPE.APPROVE,
        USER_ACTION_TYPE.REJECT,
      ],
      project: {
        id: 1,
        name: 'Research project 1',
        description: "Jane's another awesome research project.",
      },
      researcher: {
        id: 0,
        first_name: 'Jane',
        last_name: 'Doe',
        institution: 'University of Chicago',
      },
    },
    {
      id: 2,
      consortium: 'INSTRuCT',
      state: REQUEST_STATE.UNDER_REVIEW,
      submitted_at: '2021-02-19 17:13:29',
      completed_at: '',
      attributes /** @type {Attribute[]} */: [
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
      available_user_actions: [
        USER_ACTION_TYPE.REQUEST_UPDATE,
        USER_ACTION_TYPE.APPROVE,
        USER_ACTION_TYPE.REJECT,
      ],
      project: {
        id: 3,
        name: 'Research project 3',
        description: "Richard's awesome research project.",
      },
      researcher: {
        id: 1,
        first_name: 'Richard',
        last_name: 'Roe',
        institution: 'University of Chicago',
      },
    },
  ],
};

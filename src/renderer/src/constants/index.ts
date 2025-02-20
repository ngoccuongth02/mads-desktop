import { Paths } from '@renderer/constants/paths';

export const TYPE_MISSION = {
    URGENT: 'urgent',
    ONGOING: 'onGoing',
    AVAILABLE: 'available',
    LOCK: 'lock',
};

export const LIST_TYPE_MISSION = [
    {
        id: TYPE_MISSION.URGENT,
        name: 'Urgent Test',
    },
    {
        id: TYPE_MISSION.ONGOING,
        name: 'Ongoing',
    },
    {
        id: TYPE_MISSION.AVAILABLE,
        name: 'Available',
    },
    {
        id: TYPE_MISSION.LOCK,
        name: 'Lock',
    },
];

export const LIST_TYPE_LEADERBOARD = [
    {
        id: 'pre',
        name: 'Foundation',
    },
    {
        id: 'sc',
        name: 'Sprint',
    },
    {
        id: 'extra',
        name: 'Extra',
    },
    {
        id: 'other',
        name: 'Others',
    },
];

export const specialLayout = [Paths.LOGIN];

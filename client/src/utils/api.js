import qs from 'query-string';

const api = {
    createSession: 'api/createsession',
    getTickets: 'api/getTicketData',
    mockData: 'api/mockData',
    getCurrencyRates: '/api/getCurrencyRates',
};

const fetchCurrencyRates = async (base) => {
    const encodedURI = window.encodeURI(`${api.getCurrencyRates}/${base}`);
    const response = await fetch(encodedURI);
    const data = await response.json();

    return data && data.body;
};

export const createApiSession = async (query) => {
    const encodedURI = window.encodeURI(`${api.createSession}/${query}`);
    const response = await fetch(encodedURI);
    const data = await response.json();

    return data && data.body;
};

export const fetchMockTicketData = async () => {
    const response = await fetch(api.mockData);
    const data = await response.json();

    return { ...data && data.body };
};

export const fetchTickets = async (query) => {
    if (query.length === 0) {
        const mockData = fetchMockTicketData();

        return mockData;
    }
    try {
        const sessionKey = await createApiSession(query);
        if (!sessionKey) {
            throw new Error('session key error');
        }
        const { currency } = qs.parse(query);
        const currencyRates = await fetchCurrencyRates(currency);

        const ticketsURI = window.encodeURI(`${api.getTickets}/${sessionKey}`);
        const response = await fetch(ticketsURI);
        const data = await response.json();
        const tickets = data && data.body;

        return { ...tickets, currencyRates };
    } catch (error) {
        throw error;
    }
};

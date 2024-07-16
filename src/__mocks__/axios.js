// __mocks__/axios.js

const mockAxios = {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          results: [
            { id: 1, title: 'Sample Article Title', byline: 'Author Name', abstract: 'Sample abstract', url: 'https://example.com' },
            { id: 2, title: 'Sample Article Title ', byline: 'Author Name ', abstract: 'Sample abstract ', url: 'https://example.com' },
          ],
        },
      })
    ),
  };
  
  export default mockAxios;
  
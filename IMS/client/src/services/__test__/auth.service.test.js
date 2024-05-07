import ProfileService from "../profile.service"; // Adjust the import based on actual file path
import mockAxios from 'axios';

jest.mock('axios');

describe('Authentication and Profile API calls Testing', () => {
    it("login function", async () => {
        mockAxios.post.mockResolvedValue({
            data: { usertoken: "abcd1234" }
        });

        const authCredentials = await ProfileService.login("test", "12345678");

        expect(authCredentials.usertoken).toEqual("abcd1234");
    });

    it('gets total academic item requests', async () => {
        mockAxios.get.mockResolvedValueOnce({
            data: { total: 10 }
        });

        const response = await ProfileService.getTotalAcademicItemRequests();

        expect(response.data.total).toEqual(10);
        expect(mockAxios.get).toHaveBeenCalledWith("/api/academic-item-requests/total");
    });

    it('gets pending academic item requests', async () => {
        mockAxios.get.mockResolvedValueOnce({
            data: { pending: 5 }
        });

        const response = await ProfileService.getPendingAcademicItemRequests();

        expect(response.data.pending).toEqual(5);
        expect(mockAxios.get).toHaveBeenCalledWith("/api/academic-item-requests/pending");
    });
});

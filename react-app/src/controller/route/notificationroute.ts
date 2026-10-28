import express from 'express';
import RouteServiceNotification from '../../../modelBackend/servicesBackend/routeServiceNotification';

const router = express.Router();
const service = new RouteServiceNotification();

router.get('/getUpcomingNotifications/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const notifications = await service.getUpcomingNotifications(userId);
      res.json(notifications);
    } catch (error) {
        console.error('Unable to get upcoming event notifications',
        error
      );
      res.status(500).json({message:'Unable to get upcoming event notifications',
      });
    }
  }
);
export default router;
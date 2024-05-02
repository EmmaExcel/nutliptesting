//? /api/privatelisting/id note that the id is dynamic
import dbConnect from "../../../libs/dbconnect";
import Listing from "../../../models/PrivateListing";

/**
 * Handler for /api/privatelisting/[id] endpoint.
 * Allows GET, PUT and DELETE requests for a private listing by ID.
 * Connects to database, finds listing by ID, and returns response.
 */
export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get an apartment */:
      try {
        const apartment = await Listing.findById(id);
        if (!apartment) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: apartment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit an apartment */:
      try {
        const apartment = await Listing.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!apartment) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: apartment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete an apartment */:
      try {
        const deletedApartment = await Listing.deleteOne({ _id: id });
        if (!deletedApartment) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
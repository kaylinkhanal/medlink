import { Router } from "express";
import { 
  createDepartment, 
  getDepartments, 
  getDepartmentById, 
  editDepartmentById, 
  deleteDepartmentById 
} from "../controllers/department.js"; // Ensure path matches your folder structure

const departmentRouter = Router();

departmentRouter.post('/departments', createDepartment);
departmentRouter.get('/departments', getDepartments);
departmentRouter.get('/departments/:id', getDepartmentById);
departmentRouter.put('/departments/:id', editDepartmentById);
departmentRouter.delete('/departments/:id', deleteDepartmentById);

export default departmentRouter;
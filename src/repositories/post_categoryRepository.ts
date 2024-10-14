import { injectable } from "tsyringe";
import { PostCategory } from "../models/post_category";
import { Database } from "../config/database";

@injectable()
export class PostCategoryRepository{
    constructor(private db: Database){}
    async getAllPostCategories(): Promise<any>{
        try{
            const sql = "CALL GetAllCategoryPost(@err_code, @err_msg)";
            const [results] = await this.db.query(sql,[]);
            if(results.length>0 && Array.isArray(results)){
                return results;
            }
            else return null;

        }catch(err:any){    
            throw new Error(err.message);
        }
    }
}
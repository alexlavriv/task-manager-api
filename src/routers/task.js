const Task = require('../models/task')
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/task',auth, async (req, res)=>{

    const task = new Task({
        ...req.body,
        owner: res.user._id
    })
    try {
        await task.save()
       res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/task/:id',auth, async (req, res) =>{
    updateKeys = Object.keys(req.body)


    try{
      // const task = await Task.findById(req.params.id);
       const task = await Task.findOne({_id:req.params.id, owner:res.user._id});
       if(!task){
           res.status(404).send()
       }
       updateKeys.forEach(updateKey => {
           task[updateKey] = req.body[updateKey];
       });
     const updated =  await task.save()
     res.status(201).send(updated)
    }
    catch (e){
        res.send(e)
        console.log (e)
    }

        
    });

    // GET /tasks?completed=true
    // GET /tasks?limit=10&skip=20
    // GET /tasks?sortBy=createdAt_asc _desc
    router.get('/tasks', auth, async (req, res) =>{
        const match={}
        const options ={}
        if (req.query.completed){
            match.completed = req.query.completed == 'true'
        }
        if (req.query.limit){
            
            options.limit = Number(req.query.limit)
        }
        if (req.query.skip){
            options.skip = Number(req.query.skip)
        }

        options.sort={};
        
        if (req.query.sortBy){
            const parts = req.query.sortBy.split('_')
            options.sort[parts[0]] = parts[1]==='desc' ? -1 : 1
        }

        console.log(match)
        try{
           //const task = await Task.find({owner:res.user._id});
        await res.user.populate(
            {
                path:'tasks',
                match,
                options,
    
    }).execPopulate()
        res.status(200).send(res.user.tasks)
        }
        catch (e){
            res.send(e)
            console.log (e)
        }
    
            
        });
    


    router.get('/task/:id', auth, async (req, res) =>{

        const _id = req.params.id
        try{
           const task = await Task.findOne({_id, owner:res.user._id});
    
           if (!task){
               return res.status(404).send()
           }
         res.status(200).send(task)
        }
        catch (e){
            res.send(e)
            console.log (e)
        }
    
            
        });
    

        router.delete('/task/:id', auth, async (req, res) =>{

            const _id = req.params.id
            try{
               const task = await Task.findOneAndDelete({_id, owner:res.user._id});
        
               if (!task){
                   return res.status(404).send()
               }
             res.status(200).send(task)
            }
            catch (e){
                res.send(e)
                console.log (e)
            }
        
                
            });


module.exports = router
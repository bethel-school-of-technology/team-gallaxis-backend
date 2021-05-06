//route to get user profile information -> /profile
router.get('/profile', async(res, req, next) => {
    let myToken = req.headers.authorization;
    console.log(myToken);

    if (myToken){
        let currentUser = await tokenService.verifyToken(myToken);
        console.log(currentUser);

        if(currentUser){
            //route logic goes here
        }
        else{
            res.json ({
                message: "Token was invalid or expired",
                status: 403,
            })
        }
    }
    else{
        res.json({
            message: "No token received",
            status: 403,
        })
    }
})
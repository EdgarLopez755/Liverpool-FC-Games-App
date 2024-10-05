const express = require('express')
const router = express.Router()
const User = require('../models/user.js')





router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('match/index.ejs', {
            match: currentUser.match
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});




router.get('/new', async (req, res) => {
    res.render('match/new.ejs')
})

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.match.push(req.body);

        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/match`)
    } catch (err) {
        console.log(err);
        res.redirect('/')
    }
})

router.get('/:matchId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const match = currentUser.match.id(req.params.matchId)
        res.render('match/edit.ejs', {
        match,
    })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})


router.get('/:matchId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const match = currentUser.events.id(req.params.matchId)
        console.log(match)
        res.render('match/show.ejs', {
            match: match 
        })
        } catch (error) {
            res.redirect('/')
        }
})


router.put('/:matchId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const match = currentUser.match.id(req.params.eventId)
        match.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/match/${req.params.matchId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


router.delete('/:matchId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.sessionID._id)
        currentUser.match.id(req.params.eventId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${req.params.songId}/match`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})


















module.exports = router;
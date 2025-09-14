const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// User Authentication
app.post('/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ user: data.user });
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ session: data.session, user: data.user });
});

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
};


// Blog Post CRUD
app.get('/posts', async (req, res) => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

app.post('/posts', authMiddleware, async (req, res) => {
    const { title, content, tags } = req.body;
    const { data, error } = await supabase.from('posts').insert([{ title, content, tags, user_id: req.user.id }]).select();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data[0]);
});

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) return res.status(400).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Post not found' });
    res.json(data);
});

app.put('/posts/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const { data, error } = await supabase.from('posts').update({ title, content, tags }).eq('id', id).eq('user_id', req.user.id).select();
    if (error) return res.status(400).json({ error: error.message });
     if (data.length === 0) return res.status(404).json({ error: 'Post not found or you do not have permission to edit it.' });
    res.json(data[0]);
});

app.delete('/posts/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('posts').delete().eq('id', id).eq('user_id', req.user.id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
});

// User Profile
app.get('/profile', authMiddleware, async (req, res) => {
    const { data: user, error: userError } = await supabase
        .from('profiles')
        .select(`name, profile_picture_url, bio`)
        .eq('id', req.user.id)
        .single();

    if (userError) return res.status(400).json({ error: userError.message });
    
    const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', req.user.id);

    if (postsError) return res.status(400).json({ error: postsError.message });

    res.json({ ...user, posts });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

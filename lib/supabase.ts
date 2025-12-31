
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bndayrqbhrvzlpxcdqcb.supabase.co';
const supabaseKey = 'sb_publishable_9DAfo-09dTaPQxoBRUQFTw_B4fJWk5A';

export const supabase = createClient(supabaseUrl, supabaseKey);

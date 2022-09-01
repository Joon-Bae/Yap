from flask.cli import AppGroup
from .users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_businesses()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_businesses()

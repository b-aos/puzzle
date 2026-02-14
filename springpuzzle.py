import discord
from discord import app_commands
from discord.ext import commands
import os
from dotenv import load_dotenv

load_dotenv()

# Bot setup with intents
intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    """Event triggered when bot is ready"""
    print(f'{bot.user} has connected to Discord!')
    try:
        synced = await bot.tree.sync()
        print(f"Synced {len(synced)} command(s)")
    except Exception as e:
        print(f"Failed to sync commands: {e}")

@bot.tree.command(name="advance", description="advance thy self")
@app_commands.describe(answer="Enter your answer to advance")
async def advance(interaction: discord.Interaction, answer: str):
    """
    Slash command that checks if user has role 'III' and if they provide
    the correct answer 'worcestershire', then grants them role 'IV'
    """
    
    # Get the user's roles
    member = interaction.user
    guild = interaction.guild
    
    # Find the required role "III"
    role_three = discord.utils.get(guild.roles, name="III")
    # Find the role to grant "IV"
    role_four = discord.utils.get(guild.roles, name="IV")
    
    # Check if roles exist
    if not role_three:
        await interaction.response.send_message(
            "Error: Role 'III' doesn't exist on this server. Please contact an administrator.",
            ephemeral=True
        )
        return
    
    if not role_four:
        await interaction.response.send_message(
            "Error: Role 'IV' doesn't exist on this server. Please contact an administrator.",
            ephemeral=True
        )
        return
    
    # Check if user has role "III"
    if role_three not in member.roles:
        await interaction.response.send_message(
            "need role III",
            ephemeral=True
        )
        return
    
    # Check if user already has role "IV"
    if role_four in member.roles:
        await interaction.response.send_message(
            "you already have step 4",
            ephemeral=True
        )
        return
    
    # Check if the answer is correct
    if answer.lower() == "alphabet":
        try:
            await member.add_roles(role_four)
            await interaction.response.send_message(
                "succeeded, step 4 is waiting",
                ephemeral=True
            )
        except discord.Forbidden:
            await interaction.response.send_message(
                "contact @6_aos",
                ephemeral=True
            )
        except Exception as e:
            await interaction.response.send_message(
                f"error occurred: {str(e)}",
                ephemeral=True
            )
    else:
        await interaction.response.send_message(
            "incorrect ¿",
            ephemeral=True
        )

# Run the bot
if __name__ == "__main__":
    # Get token from environment variable
    TOKEN = os.getenv('DISCORD_BOT_TOKEN')
    
    if not TOKEN:
        print("ERROR: Please set the DISCORD_BOT_TOKEN environment variable")
        print("You can get your token from: https://discord.com/developers/applications")
    else:
        bot.run(TOKEN)